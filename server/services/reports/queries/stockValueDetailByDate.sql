select 
    COALESCE(sam.date, sam.createdAt) as Fecha,
    p.code as IMEI,
    pt.EAN,
    pt.description as Descripción,
    COALESCE(nullif(p.price, 0), pt.price, 0) as Precio
from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
	join (
		select p2.code, max(p2.stockAccountMovementId) as stockAccountMovementId
        from products p2
        join stockAccountMovements on stockAccountMovements.id = p2.stockAccountMovementId
		where DATEADD(Day, DATEDIFF(Day, 0, COALESCE(stockAccountMovements.date, stockAccountMovements.createdAt)), 0) <= convert(date, :date)
		group by p2.code
    ) lastProductMovement on lastProductMovement.stockAccountMovementId = p.stockAccountMovementId
	and lastProductMovement.code = p.code
where sam.type = 'receive'
order by Fecha

