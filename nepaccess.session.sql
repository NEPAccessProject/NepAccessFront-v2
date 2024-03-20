
-- Active: 1701284365713@@127.0.0.1@3306@nepaccess

select * from eisdoc limit 10


select action_type, count(1) from interaction_log
group by action_type


select decision, count(1) from eisdoc
group by decision


-- Create
select `document_type`, count(1) from eisdoc
group by document_type


-- Add EPA Comment Letter as part document type
select `document_type`, count(1) from eisdoc
group by `document_type`
order by `document_type`

-- Send Document Type

select * from vweisdoc


