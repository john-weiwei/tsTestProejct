# 环境准备
mysql、redis、nodejs

# 创建数据表
## 用户信息表
create table t_account
(
    fid          int auto_increment comment '注解id'
        primary key,
    fname        varchar(255)     not null comment '名称',
    femail       varchar(255)     not null comment '邮箱',
    fid_card     varchar(255)     not null comment '身份证',
    fis_manager  int(1) default 0 null comment '是否管理员：1-是，0-否',
    fcreate_time datetime         null comment '创建时间',
    fupdate_time datetime         null comment '更新时间'
)
    comment '账户信息表';

## 候选人信息表
create table t_candidate
(
    fid              int auto_increment comment '主键id'
        primary key,
    fkuser_id        varchar(255) not null comment '用户id',
    fstatus          varchar(16)  not null comment '选举状态：NOT_STARTED-未开始，PROCESSING-进行中，END-结束',
    fvotes           int          not null comment '得票数',
    fcreate_time     datetime     null comment '创建时间',
    fupdate_time     datetime     null comment '更新时间',
    fnumber_election int          null comment '选举批次'
)
    comment '候选人信息表';

## 投票记录信息表
create table t_vote_record
(
    fid                 int auto_increment comment '注解id'
        primary key,
    fkcandidate_user_id varchar(255) not null comment '候选人用户id',
    fkvote_user_id      varchar(16)  not null comment '投票用户id',
    fcreate_time        datetime     null comment '创建时间',
    fupdate_time        datetime     null comment '更新时间',
    fnumber_election    int          null comment '选举批次'
)
    comment '投票记录表';

# 安装依赖
typescript 插件
npm install -g typescript

typescript 的执行环境
npm install ts-node
npm install tslib @types/node -g

redis 插件
npm install redis

mysql 插件
npm install mysql

email 插件
npm install nodemailer

# 修改mysql、redis信息
分别在DBUtil.ts 和 RedisUtil.ts 文件

# 运行项目
npm run dev

# 访问api
## 例如 http://localhost:3000/pageVoteRecords?candidataUserId=3
对应的接口调用示例在TestApi.ts 文件中
