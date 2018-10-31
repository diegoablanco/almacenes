select sum(productMovement.value * productMovement.multiplier) as value from
(
select 
	case when sam.type = 'receive' then 1 else -1 end as multiplier,
	COALESCE(nullif(p.price, 0), pt.price, 0) as value
from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
	where DATEADD(Day, DATEDIFF(Day, 0, COALESCE(sam.date, sam.createdAt)), 0) <= :date
) productMovement