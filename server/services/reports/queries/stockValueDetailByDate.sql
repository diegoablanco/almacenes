;WITH Calendar AS 
(
    SELECT Convert(datetime, :dateFrom) AS CalendarDate
    UNION ALL
    SELECT CalendarDate + 1 FROM Calendar
    WHERE CalendarDate + 1 <= :dateTo
)
select 
    CalendarDate as Fecha,
    case when sam.type = 'receive' then COALESCE(nullif(p.price, 0), pt.price, 0) else -1 * COALESCE(nullif(p.price, 0), pt.price, 0) end as Valor,
    sam.type as Tipo,
    p.code as IMEI,
    pt.EAN,
    pt.description as Descripción
from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    join Calendar cal 
        on cal.CalendarDate >= DATEADD(Day, DATEDIFF(Day, 0, COALESCE(sam.date, sam.createdAt)), 0) 
        and DATEADD(Day, DATEDIFF(Day, -1, COALESCE(sam.date, sam.createdAt)), 0) >= :dateFrom
order by CalendarDate

