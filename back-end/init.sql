/* this is only used to initialize database in heroku server, useless if workin local */
CREATE TABLE accounts (
    ID VARCHAR(64) PRIMARY KEY,
    email VARCHAR(64),
    password VARCHAR(64)
);

INSERT INTO accounts(ID, email, password)
VALUES('test123','test123@gmail.com','password');