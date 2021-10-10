CREATE TABLE accounts (
    ID VARCHAR(64) PRIMARY KEY,
    email VARCHAR(64),
    password VARCHAR(64),
    account JSON
);

INSERT INTO accounts(ID, email, password, account)
VALUES('test123','test123@gmail.com','password','{}');