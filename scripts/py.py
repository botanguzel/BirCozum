import requests
import xml.etree.ElementTree as ET
import mysql.connector
from datetime import datetime

def print_item_titles(xml_content, title):
    root = ET.fromstring(xml_content)
    items = root.findall('.//item')
    conn = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="",
        database="bircozum_db"
    )

    cursor = conn.cursor()

    cleanse = "DELETE FROM duyurular WHERE duyuruID > 0"
    cursor.execute(cleanse)
    cursor.fetchall()
    reset = "ALTER TABLE duyurular AUTO_INCREMENT = 0"
    cursor.execute(reset)
    cursor.fetchall()

    for item in items:
        item_title = item.find('title').text
        if title in item_title:
            if (('VİLLAKENT' in item_title) or ('GAZİ MUSTAFA KEMAL' in item_title) or ('İNÖNÜ' in item_title)):
                item_description = item.find('description').text
                item_pubdate = item.find('pubDate').text
                pubdate_datetime = datetime.strptime(item_pubdate, "%a, %d %b %Y %H:%M:%S %Z")
                # Check if the item already exists in the database
                select_query = "SELECT COUNT(*) FROM duyurular WHERE title = %s AND `desc` = %s AND pubDate = %s"
                cursor.execute(select_query, (item_title, item_description, pubdate_datetime))
                result = cursor.fetchone()

                if result[0] == 0:
                    # Item doesn't exist, insert it into the database
                    insert_query = "INSERT INTO duyurular (title, `desc`, pubDate) VALUES (%s, %s, %s)"
                    cursor.execute(insert_query, (item_title, item_description, pubdate_datetime))
    else:
        select_query = "SELECT COUNT(*) FROM duyurular"
        cursor.execute(select_query)
        result = cursor.fetchone()
        if (result[0] == 0):
            today = datetime.now()
            today = today.strftime("%Y-%m-%d %H:%M:%S")
            insert = "INSERT INTO duyurular (title, `desc`, pubDate) VALUES (%s, %s, %s)"
            cursor.execute(insert, ('Planlanan bir kesinti yoktur', 'Şu anda Seyrek ve Villakent bölgeleri için planlanmış bir su kesintisi bulunmamaktadır!', today))

    conn.commit()  # Commit the changes
    conn.close()  # Close the database connection

url = 'https://www.izsu.gov.tr/tr/RSS/SuKesintileri/1'

try:
    response = requests.get(url)
    response.raise_for_status()  # Check for any HTTP errors

    xml_content = response.content.decode('utf-8')

    print_item_titles(xml_content, 'MENEMEN')

except requests.exceptions.RequestException as e:
    print(f"Error: {e}")