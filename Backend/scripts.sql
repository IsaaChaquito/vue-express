drop table Person

CREATE TABLE Person (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    lastname NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    profileImage NVARCHAR(MAX) NOT NULL
);

drop procedure sp_person_insert
go;
CREATE PROCEDURE sp_person_insert
    @name NVARCHAR(50),
    @lastname NVARCHAR(50),
    @email NVARCHAR(100),
    @phone NVARCHAR(15),
    @profileImage NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Person (name, lastname, email, phone, profileImage)
    VALUES (@name, @lastname, @email, @phone, @profileImage);
END;

go
create procedure sp_person_get_by_id
@id VARCHAR(50)
as
begin
select [name],lastname,email,phone,profileImage from Person where id = @id
end

drop procedure sp_person_getAll
go;
create procedure sp_person_getAll
as
begin
select [name],lastname,email,phone,profileImage from Person
end

INSERT INTO Person (name, lastname, email, phone, profileImage) VALUES
('John', 'Doe', 'johndoe@example.com', '1234567890', 'profile1.jpg'),
('Jane', 'Smith', 'janesmith@example.com', '9876543210', 'profile2.jpg'),
('Michael', 'Johnson', 'michaeljohnson@example.com', '5555555555', 'profile3.jpg'),
('Emily', 'Brown', 'emilybrown@example.com', '9999999999', 'profile4.jpg'),
('David', 'Davis', 'daviddavis@example.com', '1111111111', 'profile5.jpg');


exec sp_person_getAll