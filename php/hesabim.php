<?php
	require_once("./connect.php");
	include('../alt/nav-bar.php');
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Account Settings - BirCözum</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
		<script src="../scripts/userInfo.js"></script>
		<script src="../scripts/kullaniciSikayetleri.js"></script>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="../styles/style.css">
		<link rel="stylesheet" href="../styles/hesabim.css">
	</head>

	<body>
		<section class="py-5 my-5">
			<div class="container">
				<h1 class="mb-5">Account Settings</h1>
				<div class="bg-white shadow rounded-lg d-block d-sm-flex">
					<div class="profile-tab-nav border-right" style="width:20%;">
						<div class="p-4">
							<div class="img-circle text-center mb-3"></div>
							<h4 id="kullanici" class="text-center"></h4>
						</div>
						<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
							<a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
								<i class="fa fa-home text-center mr-1"></i> 
								Account
							</a>
							<a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
								<i class="fa fa-key text-center mr-1"></i> 
								Password
							</a>
							<a class="nav-link" id="account-tab" data-toggle="pill" href="#entries" role="tab" aria-controls="account" aria-selected="false">
							<i class="fa fa-exclamation-triangle text-center mr-1"></i>
								Entries
							</a>
							<a class="nav-link" id="account-tab" data-toggle="pill" href="#advices" role="tab" aria-controls="account" aria-selected="false">
								<i class="fa fa-question-circle  text-center mr-1"></i> 
								Advices
							</a>
							<?php
								if (isset($_SESSION['loggedin'], $_SESSION['token'])) {
										if ($_SESSION['name'] === 'xwede') {
											echo '<a class="nav-link" id="super-tab" data-toggle="pill" href="#super" role="tab" aria-controls="super" aria-selected="false">
													<i class="fa fa-question-circle  text-center mr-1"></i> 
													Super
												</a>';
										}
									}
							?>
						</div>
					</div>

					<div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
						<div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
							<h3 class="mb-4">Account Settings</h3>
							<form action="update_profile.php" method="POST">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label>First Name</label>
											<input id="firstName" name="firstName" type="text" class="form-control" value="" required pattern="[a-zA-Z].{4,25}" title="Only letters allowed">
										</div>
									</div>
									
									<div class="col-md-6">
										<div class="form-group">
											<label>Last Name</label>
											<input id="lastName" name="lastName" type="text" class="form-control" value="" required pattern="[a-zA-Z].{4,25}" title="Only letters allowed">
										</div>
									</div>
									
									<div class="col-md-6">
										<div class="form-group">
											<label>Email</label>
											<input id="email" name="email" type="text" class="form-control" value="" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
												title="Must be in this format: email@email.co">
										</div>
									</div>
								</div>

							<div>
								<input type="submit" class="btn btn-primary">
							</div>
						</form>
					</div>

					<div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
						<h3 class="mb-4">Password Settings</h3>
						<form action="./change_password.php" method="POST">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Old password</label>
										<input name="oldpasswrd" type="password" class="form-control">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>New password</label>
										<input name="newpasswrd" type="password" class="form-control">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Confirm new password</label>
										<input name="newpasswrdConfirm" type="password" class="form-control">
									</div>
								</div>
							</div>
							
							<div>
								<input type="submit" class="btn btn-primary">
							</div>
						</form>
					</div>

					<div class="tab-pane fade" id="entries" role="tabpanel" aria-labelledby="entries-tab">
						<h3 class="mb-4">Şikayetlerim</h3>
						<div class="row">
						<div id="leftColIn" class="leftColIn"></div>
						</div>
					</div>

					<div class="tab-pane fade" id="advices" role="tabpanel" aria-labelledby="advices-tab">
						<h3 class="mb-4">Önerilerim</h3>
						<div class="row">
						<div id="leftColInS" class="leftColIn"></div>
						</div>
					</div>
					<?php
						if (isset($_SESSION['loggedin'], $_SESSION['token'])) {
							if ($_SESSION['name'] === 'xwede') {
								echo '<div class="tab-pane fade" id="super" role="tabpanel" aria-labelledby="super-tab">
										<h3 class="mb-4">Super</h3>
										<div class="d-grid">
											<div class="row">
												<div class="col-md-6">
													<button id="el" class="btn btn-warning btn-outline-danger btn-lg"
													title="Elektrik duyurular database otomatik güncellemesinde sorun varsa buradan zorla güncelleyebilirsiniz">
													Elektrik duyurular db force-update</button>
												</div>
												<div class="col-md-6">
													<button id="duy" class="btn btn-warning btn-outline-danger btn-lg"
													title="Duyurular database otomatik güncellemesinde sorun varsa buradan zorla güncelleyebilirsiniz">
													Duyurular db force-update
													</button>
													<div id="loadingIndicator"></div>
												</div>
											</div>
										</div>
									</div>
									<script src="../scripts/super.js"></script>
									<link rel="stylesheet" href="../styles/super.css">';
							}
						}
					?>


					</div>
				</div>
			</div>

			<button id="notification" class="button">
				<svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
				Notifications
			</button>


		</section>
	</body>
</html>