# 创建数据表
## 用户信息表
create table t_account
(
    fid          int auto_increment
        primary key,
    fname        varchar(255)     not null,
    femail       varchar(255)     not null,
    fid_card     varchar(255)     not null,
    fis_manager  int(1) default 0 null,
    fcreate_time date             null,
    fupdate_time date             null
);

## 候选人信息表
create table t_candidata
(
    fid          int auto_increment
        primary key,
    fkuser_id        varchar(255)     not null,
    fstatus       varchar(16)     not null,
    fvotes     int(11)     not null,
    fcreate_time date             null,
    fupdate_time date             null
);

## 投票记录信息表
create table t_vote_record
(
    fid          int auto_increment
        primary key,
    fkcandidate_user_id        varchar(255)     not null,
    fkvote_user_id       varchar(16)     not null,
    fcreate_time date             null,
    fupdate_time date             null
);
