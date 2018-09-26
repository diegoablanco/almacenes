select
    p.code as IMEI,
    pt.ean as EAN,
    pt.description as Descripción,
    COALESCE(p.price, pt.price) as Precio
from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    inner join (
        select p2.stockAccountMovementId, stockAccountMovements.type
    from products p
        cross apply (select top 1
            *
        from products p2
        where p.code = p2.code
        order by createdAt desc) p2
        join stockAccountMovements on stockAccountMovements.id = p2.stockAccountMovementId
    group by p2.stockAccountMovementId, stockAccountMovements.type
    having stockAccountMovements.type = 'receive'
    ) lastProductMovement on lastProductMovement.stockAccountMovementId = p.stockAccountMovementId
where (:dateTo is null OR sam.date <= :dateTo)
order by pt.ean