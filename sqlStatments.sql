insert into usr_0_fbn_usr_branch_mapping (user_id,user_name,sole_id,branch_name,userrole) values ('SN029437','Kufre G Udoko','930','Head Office','Developer')

update usr_0_fbn_usr_branch_mapping set sole_id = 406 where user_id ='SN029437'

select * from usr_0_fbn_usr_branch_mapping where user_id = ''
create or replace table mm_setup_tbl
(
refId  VARCHAR2(2000),
winame VARCHAR2(2000),
process VARCHAR2(2000),
marketType VARCHAR2(2000),
landingMessage VARCHAR2(2000),
minPrincipalAmount VARCHAR2(2000),
rediscountRateless90 VARCHAR2(2000),
rediscountRateless180 VARCHAR2(2000),
rediscountRateless270 VARCHAR2(2000),
rediscountRateless364 VARCHAR2(2000),
openDate VARCHAR2(2000),
closeDate VARCHAR2(2000),
closeFlag CHAR(1) DEFAULT 'N',
CONSTRAINT pk_mm_setup_tbl PRIMARY KEY (refId)
)


CREATE SEQUENCE  REF_ID_SEQ  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE NOCYCLE;

mm_bid_tbl


