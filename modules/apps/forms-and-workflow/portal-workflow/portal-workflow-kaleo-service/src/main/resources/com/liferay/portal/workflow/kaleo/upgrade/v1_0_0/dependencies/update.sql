alter table kaleoDefinition add content TEXT null;

create table KaleoTimer (
	kaleoTimerId LONG not null primary key,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(200) null,
	createDate DATE null,
	modifiedDate DATE null,
	kaleoClassName VARCHAR(200) null,
	kaleoClassPK LONG,
	kaleoDefinitionId LONG,
	name VARCHAR(75) null,
	blocking BOOLEAN,
	description STRING null,
	duration DOUBLE,
	scale VARCHAR(75) null,
	recurrenceDuration DOUBLE,
	recurrenceScale VARCHAR(75) null
);

create table KaleoTimerInstanceToken (
	kaleoTimerInstanceTokenId LONG not null primary key,
	groupId LONG,
	companyId LONG,
	userId LONG,
	userName VARCHAR(200) null,
	createDate DATE null,
	modifiedDate DATE null,
	kaleoClassName VARCHAR(200) null,
	kaleoClassPK LONG,
	kaleoDefinitionId LONG,
	kaleoInstanceId LONG,
	kaleoInstanceTokenId LONG,
	kaleoTaskInstanceTokenId LONG,
	kaleoTimerId LONG,
	kaleoTimerName VARCHAR(200) null,
	blocking BOOLEAN,
	completionUserId LONG,
	completed BOOLEAN,
	completionDate DATE null,
	workflowContext TEXT null
);

COMMIT_TRANSACTION;