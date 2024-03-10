# Нужно переименовать .env-example в .env и настроить

## Схема БД со стартовыми данными
```postgresql
drop table todos;
drop table tags;

create table tags (
    id serial unique,
    title varchar(255) NOT NULL,
    constraint tags_pk primary key(id)
);

insert into tags(title)
values('Зеленый'), ('Желтый'), ('Красный');

create table todos (
 id serial unique,
 title varchar(255) NOT NULL,
 description varchar(255),
 created_at timestamp NOT NULL,
 completed_at timestamp,
 tag_id integer NOT NULL,
 primary key(id),
 constraint fk_tag foreign key(tag_id) references tags(id)
);
```
