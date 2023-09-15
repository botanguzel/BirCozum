import requests
import xml.etree.ElementTree as ET
import mysql.connector
from datetime import datetime
import json

def print_item_titles(json_content, title):
    today = datetime.now()
    today = today.strftime("%Y-%m-%d %H:%M:%S")
    conn = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="",
        database="bircozum_db"
    )
    cursor = conn.cursor()

    cleanse = "DELETE FROM elektrik_duyurular WHERE delID > 0"
    cursor.execute(cleanse)
    cursor.fetchall()
    reset = "ALTER TABLE elektrik_duyurular AUTO_INCREMENT = 0"
    cursor.execute(reset)
    cursor.fetchall()

    data = json.loads(json_content).get('data')
    for item in data:
        sehir = item['Sehir']
        ilce = item['Ilce']
        mahalle = item['Mahalle']
        sokak = item['Sokak']
        kesinti_nedeni = item['Kesinti_Nedeni']
        planlanan_baslangic = item['Planlanan_Baslangic_Zamani']
        planlanan_son = item['Planlanan_Sona_Erme_Zamani']
        cbs_koordinat = item['CBS_Koordinat']
        lat, lng = extract_coordinates(cbs_koordinat)
        if (sehir == 'İZMİR'):
            if (ilce == 'MENEMEN'):
                if(mahalle == 'GAZİ MUSTAFA KEMAL'):
                    insert_query = "INSERT INTO elektrik_duyurular (ilce, mahalle, sokak, kesintiNedeni, lat, lng, startDate, endDate, runDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    cursor.execute(insert_query, (ilce, mahalle, sokak, kesinti_nedeni, lat, lng, planlanan_baslangic, planlanan_son, today))
                elif(mahalle == 'İNÖNÜ'):
                    insert_query = "INSERT INTO elektrik_duyurular (ilce, mahalle, sokak, kesintiNedeni, lat, lng, startDate, endDate, runDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    cursor.execute(insert_query, (ilce, mahalle, sokak, kesinti_nedeni, lat, lng, planlanan_baslangic, planlanan_son, today))
                elif (mahalle == 'VİLLAKENT'):
                    insert_query = "INSERT INTO elektrik_duyurular (ilce, mahalle, sokak, kesintiNedeni, lat, lng, startDate, endDate, runDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    cursor.execute(insert_query, (ilce, mahalle, sokak, kesinti_nedeni, lat, lng, planlanan_baslangic, planlanan_son, today))
    check_query = "SELECT COUNT(*) FROM elektrik_duyurular"
    cursor.execute(check_query)
    count = cursor.fetchone()
    if (count[0] == 0):
        insert_query = "INSERT INTO elektrik_duyurular (ilce, mahalle, sokak, kesintiNedeni, lat, lng, startDate, endDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, ('None', 'None', 'None', 'Şu anda Seyrek ve Villakent bölgeleri için planlanmış bir elektrik kesintisi bulunmamaktadır!', 'None', 'None', today, today))

    
    conn.commit()  # Commit the changes
    conn.close()  # Close the database connection



def extract_coordinates(cbs_koordinat):
    cbs_koordinat = cbs_koordinat.replace('POINT (', '').replace(')', '')
    lat, lng = cbs_koordinat.split(' ')
    return lat, lng

url = 'https://www.gdzelektrik.com.tr/outages_data/izmir/menemen'

try:
    response = requests.get(url)
    response.raise_for_status()  # Check for any HTTP errors

    xml_content = response.content.decode('utf-8')
    print_item_titles(xml_content, 'MENEMEN')

except requests.exceptions.RequestException as e:
    print(f"Error: {e}")