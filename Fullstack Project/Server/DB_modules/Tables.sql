DROP TABLE Users
DROP TABLE User_Favorites
DROP TABLE User_Visited
DROP TABLE User_Last_Visited
DROP TABLE Family_Recipes
DROP TABLE Private_Recipes

-- USERS
CREATE TABLE Users(
    userName varchar(20) not null,
    firstName varchar(20) not null,
    lastName varchar(20) not null,
    country varchar(20) not null,
    pass varchar(1000) not null,
    email varchar(45) not null,
    image_url varchar(150) not null,
    PRIMARY KEY(userName)
);

-- FAVORITES
CREATE TABLE User_Favorites(
    userName varchar(20) not null,
    recepie_Id int not null,
    PRIMARY KEY(userName,recepie_Id)
);

-- VISITED
CREATE TABLE User_Visited(
    userName varchar(20) not null,
    recepie_Id int not null,
    PRIMARY KEY(userName,recepie_Id)
);

-- LAST
CREATE TABLE User_Last_Visited(
    userName varchar(20) not null,
    recepie_Id_1 int,
    recepie_Id_2 int,
    recepie_Id_3 int,
    PRIMARY KEY(userName)
);

-- PRIVATE
CREATE TABLE Private_Recipes(
    userName varchar(20) not null,
    title varchar(50) not null,
    image varchar(1250) not null,
    readyInMinute int not null,
    aggregateLikes int not null,
    vegetarian varchar(150) not null,
    vegan varchar(150) not null,
    glutenFree varchar(150) not null,
    visited varchar(150) not null,
    favorite varchar(150) not null,
    servings int not null,
    ingredients varchar(1250) not null,
    instructions varchar(1250) not null,
    PRIMARY KEY(userName,title)
);

-- FAMILY
CREATE TABLE Family_Recipes(
    userName varchar(20) not null,
    title varchar(50) not null,
    image_url varchar(1250) not null,
    readyInMinute int not null,
    recipe_owner varchar(150) not null,
    when_served varchar(150) not null,
    servings int not null,
    ingredients varchar(1250) not null,
    instructions varchar(1250) not null,
    PRIMARY KEY(userName,title)
);