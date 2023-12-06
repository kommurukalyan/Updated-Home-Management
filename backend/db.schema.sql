CREATE TABLE `admins` (
  `Id` varchar(50) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Image` varchar(70) DEFAULT NULL,
  `IsDeleted` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `documents` (
  `Id` varchar(50) NOT NULL,
  `DocumentName` varchar(45) DEFAULT NULL,
  `StartDate` varchar(50) DEFAULT NULL,
  `RenewalPeriod` varchar(45) DEFAULT NULL,
  `EndDate` varchar(50) DEFAULT NULL,
  `CreatedDate` varchar(60) DEFAULT NULL,
  `CreatedBy` varchar(60) DEFAULT NULL,
  `IsDeleted` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `roles` (
  `Id` varchar(50) NOT NULL,
  `RoleName` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `subscriptions` (
  `Id` varchar(100) NOT NULL,
  `AccountName` varchar(65) DEFAULT NULL,
  `PlanPeriod` varchar(70) DEFAULT NULL,
  `StartDate` varchar(50) DEFAULT NULL,
  `EndDate` varchar(50) DEFAULT NULL,
  `CreatedDate` varchar(65) DEFAULT NULL,
  `CreatedBy` varchar(65) DEFAULT NULL,
  `IsDeleted` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `users` (
  `Id` varchar(100) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Image` varchar(45) DEFAULT NULL,
  `IsDeleted` int DEFAULT NULL,
  `AdminId` varchar(100) DEFAULT NULL,
  `IsAdmin` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `Password_UNIQUE` (`Password`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Create_Admins`(
Id Varchar(100),
Name varchar(40),
Age Int,
Phone Varchar(30),
Email varchar(50),
Password varchar(100),
Image varchar(50),
IsDeleted Int
)
BEGIN
Insert into admins(Id,Name,Age,Phone,Email,Password,Image,IsDeleted)
      values(Id,Name,Age,Phone,Email,Password,Image,IsDeleted);

Insert into users(Id,Name,Age,Phone,Email,Password,Image,IsDeleted,AdminId,IsAdmin)
      values(Id,Name,Age,Phone,Email,Password,Image,IsDeleted,Id,0);
      
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Create_Document`(
Id Varchar(100),
DocumentName varchar(40),
CreatedDate varchar(40),
RenewalPeriod Varchar(30),
EndDate varchar(50),
CreatedBy varchar(100),
IsDeleted Int
)
BEGIN
Insert into Documents (Id,DocumentName,StartDate,RenewalPeriod,EndDate,CreatedDate,CreatedBy,IsDeleted)
  values(Id,DocumentName,CreatedDate,RenewalPeriod,EndDate,now(),CreatedBy,IsDeleted);

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Create_Subscription`(
Id Varchar(100),
AccountName varchar(40),
PlanPeriod varchar(40),
StartDate Varchar(30),
EndDate varchar(50),
CreatedBy varchar(100),
IsDeleted Int
)
BEGIN
Insert into subscriptions(Id,AccountName,PlanPeriod,StartDate,EndDate,CreatedDate,CreatedBy,IsDeleted)
  values(Id,AccountName,PlanPeriod,StartDate,EndDate,now(),CreatedBy,IsDeleted);

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Create_Users`(
Id Varchar(100),
Name varchar(40),
Age Int,
Phone Varchar(30),
Email varchar(50),
Password varchar(100),
Image varchar(50),
IsDeleted Int,
AdminId varchar(100)
)
BEGIN
Insert into users(Id,Name,Age,Phone,Email,Password,Image,IsDeleted,AdminId,IsAdmin)
  values(Id,Name,Age,Phone,Email,Password,Image,IsDeleted,AdminId,1);

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Document`(
Id varchar(100)
)
BEGIN
Update documents
set IsDeleted=1
where documents.Id=Id;


END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Subscription`(
Id varchar(100)
)
BEGIN
Update subscriptions
set IsDeleted=1
where subscriptions.Id=Id;


END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_User`(
Id varchar(100)
)
BEGIN
Update users
set IsDeleted=1
where users.Id=Id;


END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_DocumentById`(
Id varchar(100)
)
BEGIN
select Id,
       DocumentName,
       StartDate,
       RenewalPeriod,
       EndDate,
       CreatedDate,
       CreatedBy,
	  IsDeleted
       FROM Documents where Documents.Id=Id and Documents.IsDeleted=0;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Documents`(
UserId varchar(100)
)
BEGIN
set @AdminId=(select users.AdminId from users where users.Id=UserId);
drop temporary table if exists tempusers;
create temporary table tempusers
(
Id varchar(50)
);
insert into tempusers 
select users.Id from users where users.AdminId=@AdminId;

select 
    documents.Id,
    documents.DocumentName,
    documents.StartDate,
    documents.RenewalPeriod,
    documents.EndDate,
    Users.Name as CreatedBy,
    documents.IsDeleted
    from documents  left join users on users.Id=documents.CreatedBy
    where documents.createdBy in(select tempusers.Id from tempusers)and documents.IsDeleted=0 order by CreatedDate desc;
    
    
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_SubscriptionById`(
Id varchar(100)
)
BEGIN
select Id,
       AccountName,
       PlanPeriod,
       StartDate,
       EndDate,
       CreatedBy,
	  IsDeleted
       FROM subscriptions where subscriptions.Id=Id and subscriptions.IsDeleted=0;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Subscriptions`(
UserId varchar(100)
)
BEGIN
set @AdminId=(select users.AdminId from users where users.Id=UserId);
drop temporary table if exists tempusers;
create temporary table tempusers
(
Id varchar(50)
);
insert into tempusers 
select users.Id from users where  users.AdminId=@AdminId;

select 
    subscriptions.Id,
    subscriptions.AccountName,
    subscriptions.PlanPeriod,
    subscriptions.StartDate,
    subscriptions.EndDate,
    Users.Name as CreatedBy,
    subscriptions.IsDeleted
    from subscriptions 
    left join users on users.Id=subscriptions.CreatedBy
    where subscriptions.createdBy in(select tempusers.Id from tempusers)and subscriptions.IsDeleted=0 order by CreatedDate desc;
    
    
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_UserById`(
Id varchar(100)
)
BEGIN
select Id,
       Name,
       Email,
       Phone,
       Age,
       Image,
       Password,
	   AdminId
       FROM users where users.Id=Id and IsDeleted=0;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Users`(
AdminId varchar(100)
)
BEGIN
select Id,
       Name,
       Email,
       Phone,
       Age,
       Image,
	   AdminId
       FROM users where users.IsDeleted=0 and users.AdminId=AdminId;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Document`(
Id varchar(100),
DocumentName varchar(40),
RenewalPeriod varchar(30),
StartDate varchar(30),
EndDate varchar(80)
)
BEGIN
Update documents
set documents.DocumentName=DocumentName,
    documents.RenewalPeriod=RenewalPeriod,
    documents.StartDate=StartDate,
    documents.EndDate=EndDate
    where documents.Id=Id;
    
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Password`(
Email varchar(60),
Password varchar(100)
)
BEGIN
Update users
set users.Password=Password
    where users.Email=Email;

END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Profile`(
Id varchar(50),
Image varchar(80)
)
BEGIN
update users
set Image=Image
where Id=Id;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Subscription`(
Id varchar(100),
AccountName varchar(40),
PlanPeriod varchar(30),
StartDate varchar(30),
EndDate varchar(30)
)
BEGIN
Update subscriptions
set subscriptions.AccountName=AccountName,
    subscriptions.PlanPeriod=PlanPeriod,
    subscriptions.StartDate=StartDate,
    subscriptions.EndDate=EndDate
    where subscriptions.Id=Id;
    
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_User`(
Id varchar(100),
Name varchar(50),
Age Int,
Phone varchar(40),
Email varchar(60),
Image varchar(50)
)
BEGIN
if Image is null then
Update users
set users.Name=Name,
    users.Age=Age,
    users.Phone=Phone,
    users.Email=Email
    where users.Id=Id;
else
Update users
set users.Name=Name,
    users.Age=Age,
    users.Phone=Phone,
    users.Email=Email,
    users.Image=Image
    where users.Id=Id;
    end if;
    
END$$
DELIMITER ;
