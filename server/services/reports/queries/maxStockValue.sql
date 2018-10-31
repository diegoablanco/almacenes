;WITH Calendar AS 
(
    SELECT Convert(datetime, :dateFrom) AS CalendarDate
    UNION ALL
    SELECT CalendarDate + 1 FROM Calendar
    WHERE CalendarDate + 1 <= :dateTo
)

select top 1 
    productMovement.calendarDate as date, 
    :previousValue + sum(productMovement.value * productMovement.multiplier) as value from
(
select 
	calendarDate,
	case when sam.type = 'receive' then 1 else -1 end as multiplier,
	COALESCE(nullif(p.price, 0), pt.price, 0) as value
from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
	join Calendar cal on cal.CalendarDate >= DATEADD(Day, DATEDIFF(Day, 0, COALESCE(sam.date, sam.createdAt)), 0) 
		and DATEADD(Day, DATEDIFF(Day, 0, COALESCE(sam.date, sam.createdAt)), 0) >= :dateFrom
) productMovement
group by productMovement.calendarDate
order by value desc
OPTION (MAXRECURSION 1000)