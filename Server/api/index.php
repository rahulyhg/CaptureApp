<?php

require 'Slim/Slim.php';







\Slim\Slim::registerAutoloader();


$app = new \Slim\Slim();


function checkAPIKey($key){
    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    
        
    $sql = "SELECT * FROM user WHERE USER_ID ='".$key."'";
    
    $result = $conn->query($sql);

    $resultArray = array();
    if($result != null){
        while($row = $result->fetch_assoc()) {
            $resultArray[] = $row;
        }
    }
    return (sizeof($resultArray) >0);
    //return $key == '271fd9afef98974d403cfcb5052ac53c';
}


$app->post('/registerUser/:username/:password', function ($user,$passwd) {
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    /*if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }*/
        
    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $uniqid = uniqid();
    
    $sql = "INSERT INTO user (USERNAME, PASSWORD, USER_ID)
VALUES ('".$user."', '".$passwd."', '".$uniqid."')";
    $result = $conn->query($sql);
    
    echo $uniqid;

});

$app->get('/login/:username/:password', function ($user,$passwd) {
    
    
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    /*if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }*/
    
        
    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "SELECT USER_ID,USERNAME FROM user WHERE USERNAME='".$user."' AND PASSWORD='".$passwd."'";
    $result = $conn->query($sql);

    while($row = $result->fetch_assoc()) {
        echo json_encode($row);
    }

    $conn->close();
    
});

$app->get('/getMomentsForUser/:userID',function($userID){
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    
        
    $sql = "SELECT * FROM Moments WHERE USER_ID ='".$userID."'";
    
    $result = $conn->query($sql);

    $resultArray = array();
    if($result != null){
        while($row = $result->fetch_assoc()) {
            $row['LOCATION'] = array("LAT"=>$row['LAT'],"LNG"=>$row['LNG']);
            unset($row['LAT']);
            unset($row['LNG']);
            $resultArray[] = $row;
        }
    }
    echo json_encode($resultArray);
});

function removeDirectory($path) {
 	$files = glob($path . '/*');
	foreach ($files as $file) {
		is_dir($file) ? removeDirectory($file) : unlink($file);
	}
	rmdir($path);
 	return;
}


$app->post('/deleteMoment/:uid',function($uid){
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
 
    if(file_exists("../Media/".$uid)){
        removeDirectory('../Media/'.$uid);
    }
    
    $sql = "DELETE FROM Media WHERE MOMENTID='".$uid."'";
    if ($conn->query($sql) === TRUE) {
        echo "Post Media deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    
    $sql = "DELETE FROM Moments WHERE GUID='".$uid."'";
    if ($conn->query($sql) === TRUE) {
        echo "Post deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }


    $conn->close();
});


$app->post('/deleteMomentContent/:uid',function($uid){
        $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
 
    
    $sql = "SELECT * FROM Media WHERE GUID ='".$uid."'";
    
    $result = $conn->query($sql);

    if($result != null){
        while($row = $result->fetch_assoc()) {
            unlink('../'.$row['PATH']);
        }
    }
    $sql = "DELETE FROM Media WHERE GUID='".$uid."'";
    if ($conn->query($sql) === TRUE) {
        echo "Post Media deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
});


$app->post('/postMoment',function(){
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }
    $json = $request->getBody();
    $jsonDecoded = json_decode($json,true);

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $title = $jsonDecoded['Title'];
    $comment= $jsonDecoded['Comment'];
    $user_id= $jsonDecoded['UserID'];
    $guid = $jsonDecoded['GUID'];
    $lat = $jsonDecoded['Location']['Lat'];
    $lng = $jsonDecoded['Location']['Lng'];
    
 
    
    $sql = "INSERT INTO Moments (TITLE, COMMENT,USER_ID,LAT,LNG,GUID)
    VALUES ('".$title."', '".$comment."','".$user_id."', '".$lat."','".$lng."', '".$guid."')";
    

    if ($conn->query($sql) === TRUE) {
        echo "New Moment created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
});


$app->get('/getMomentMedia/:momentID/', function ($momentID) {
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    
        
    $sql = "SELECT * FROM Media WHERE MOMENTID ='".$momentID."'";
    
    $result = $conn->query($sql);

    $resultArray = array();
    if($result != null){
        while($row = $result->fetch_assoc()) {
            $resultArray[] = $row;
        }
    }
    echo json_encode($resultArray);
});

$app->get('/getMomentMediaContent/:uid/', function ($uid) {
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    
        
    $sql = "SELECT * FROM Media WHERE GUID ='".$uid."'";
    
    $result = $conn->query($sql);

    $resultMedia = null;
    if($result != null){
        while($row = $result->fetch_assoc()) {
            $resultMedia = $row;
        }
    }
    if($resultMedia != null){ 
        if(file_exists("../".$resultMedia['PATH'])){
            echo readfile("../".$resultMedia['PATH']);
        }
        else{
            echo "File doesnt exist";   
        }
    }
});


$app->post('/postMomentContent/:uid/:momentID/:userID/:type', function ($uid,$momentID,$userID,$type) {
    $instance = \Slim\Slim::getInstance();
    $request = $instance->request();
    $apiKey = $request->headers->get('Softrocket-Api-Key');
    if(!checkAPIKey($apiKey)){
        echo "API-KEY not valid.";
        return;
    }

    $mediaPath = "Media/".$momentID."/".$uid.".dat";
    if(!file_exists("../Media/".$momentID)){
        mkdir("../Media/".$momentID, 0777);
    }
    if (!empty($_FILES) ) {

        $tempPath = $_FILES['file'][ 'tmp_name' ];
        $uploaddir = '/var/www/captureApp';
        $uploadPath = $uploaddir.'/'.$mediaPath;

        move_uploaded_file( $tempPath, $uploadPath );

        $answer = array( 'answer' => 'File transfer completed' );
        $json = json_encode( $answer );
        echo $uploadPath;

        echo $json;

    } else {
        $bytes = $request->getBody();
        $imgFile = fopen("../".$mediaPath, "w") or die("Unable to open file!");
        fwrite($imgFile, $bytes);
        fclose($imgFile);
    }
    

    
    
    $servername = "localhost";
    $username = "root";
    $password = "Laika233";
    $dbname = "captureapp";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "INSERT INTO Media (MOMENTID,GUID,PATH,TYPE) VALUES ('".$momentID."','".$uid."','".$mediaPath."','".$type."')";
    echo $sql;
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

});




$app->run();




?>