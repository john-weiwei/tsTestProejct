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
    fcreate_time datetime             null,
    fupdate_time datetime             null
);

## 候选人信息表
create table t_candidate
(
    fid          int auto_increment
        primary key,
    fkuser_id        varchar(255)     not null,
    fstatus       varchar(16)     not null,
    fvotes     int(11)     not null,
    fcreate_time datetime             null,
    fupdate_time datetime             null
);

## 投票记录信息表
create table t_vote_record
(
    fid          int auto_increment
        primary key,
    fkcandidate_user_id        varchar(255)     not null,
    fkvote_user_id       varchar(16)     not null,
    fcreate_time datetime             null,
    fupdate_time datetime             null
);

# 安装依赖

typescript 插件
npm install -g typescript 

redis 插件
npm install redis

mysql 插件
npm install mysql

email 插件
npm install nodemailer

typescript 的执行环境
npm install ts-node
npm install tslib @types/node -g
