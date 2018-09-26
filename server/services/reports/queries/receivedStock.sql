select 
    format(sam.date, 'dd/MM/yyyy', 'en-US') as Fecha, 
    p.code as IMEI, 
    pt.ean as EAN, 
    pt.description as Descripción,
    p.price as Precio
from products p
join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
join [dbo].[productTypes] pt on p.typeId = pt.id
where sam.type = 'receive'
and (:dateFrom is null OR sam.date >= :dateFrom)
and (:dateTo is null OR sam.date <= :dateTo)
order by sam.date, pt.description