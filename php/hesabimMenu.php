<div class="container">
    <div id="top" class="row">
        <div class="col-md-6 h2 mb-5" style="color:black;">Gönderiyi Düzenle</div>
    </div>
    <div class="bg-white d-block d-sm-flex">
        <div class="profile-tab-nav border-right" style="width:20%;">
        
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active show" id="edit-tab" data-toggle="pill" href="#edit" role="tab" aria-controls="edit" aria-selected="true">
                    <i class="fa fa-home text-center mr-1"></i> 
                    Edit
                </a>
                <a class="nav-link" id="remove-tab" data-toggle="pill" href="#remove" role="tab" aria-controls="remove" aria-selected="false">
                <i class="fa fa-trash"></i>
                    Remove
                </a>
            </div>
        </div>

        <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">

            <div class="tab-pane fade active show" id="edit" role="tabpanel" aria-labelledby="edit-tab">
            <form id="entryEdit" style="color: black;">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Yeni başlık</label>
										<input name="newtitle" type="text" class="form-control" placeholder="Başlık yazınız" required pattern="[a-zA-Z].{2,80}"
                                            title="Lütfen 2-40 karakter sınırlarına uyunuz">
									</div>
								</div>
                                <div class="col-md-6">
									<div class="form-group" style="margin-top:15px;">
										<label class="container"
										style="font-size :larger;" >Sorun hala devam ediyor mu ?
										<input type="checkbox" checked="checked" name="status"
										style="height:20px ;
												width: 20px;">
										<span class="checkmark"></span>
										</label>
									</div>
                                    <input name="type" type="hidden" value=<?php echo isset($_GET['type']) ? $_GET['type'] : ''; ?>>
                                    <input type="hidden" name="entryID" value="<?php echo isset($_GET['entryID']) ? $_GET['entryID'] : ''; ?>">
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Yeni açıklama</label>
										<input name="newdesc" type="text" class="form-control" placeholder="Başlık yazınız" required pattern="[a-zA-Z].{5,80}"
                                        title="Lütfen 5-40 karakter sınırlarına uyunuz">
									</div>
								</div>
							</div>
							
							<div>
								<input type="submit" class="btn btn-primary">
							</div>
						</form>
            </div>

            <div class="tab-pane fade" id="remove" role="tabpanel" aria-labelledby="remove-tab">
                <h3 class="mb-4" style="color: black;"> Bu gönderiyi silmek istediğine emin misin?<br>
                    <b>Bu işlemin geri dönüşü yoktur!</b>
                </h3>
               <form  id="entryRemove">
                    <input type="hidden" name="type" value=<?php echo isset($_GET['type']) ? $_GET['type'] : ''; ?>>
                    <input type="hidden" name="entryID" value="<?php echo isset($_GET['entryID']) ? $_GET['entryID'] : ''; ?>">
                    <input type="submit" class="btn btn-primary">
                </form>
            </div>


        </div>
    </div>
</div>