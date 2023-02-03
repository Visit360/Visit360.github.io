<!DOCTYPE HTML>
<html>
<head>
    <title>pannellum embed example</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <iframe width="900" height="450" allowfullscreen style="border-style:none;" src="../../Pannellum/src/standalone/pannellum.htm?config=../../../Visit360/main/example_test.json"></iframe>
    <div>Hello world!</div>


    <!-- 
    <label for="avatar">Import Panorama:</label>
    <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg">
     -->

     <form action="upload.php" method="post" enctype="multipart/form-data">
        Select image to upload:
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload Image" name="submit">
    </form>

    <?php
     echo "This is PHP code inside html"
    ?>


    
    
</body>
</html>