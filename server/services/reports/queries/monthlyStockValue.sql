select
  FORMAT(sam.createdAt, 'MMMM', 'es-es') AS Mes,
  count(p.id) as 'Cantidad',
  FORMAT(avg(COALESCE(nullif(p.price, 0), pt.price, 0)), 'C', 'es-es') as 'Precio promedio'
from
  products p
  join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
  join [dbo].[productTypes] pt on p.typeId = pt.id
  join (
    select p2.code, max(p2.stockAccountMovementId) as stockAccountMovementId
      from products p2
      join stockAccountMovements on stockAccountMovements.id = p2.stockAccountMovementId
		  group by p2.code
    ) lastProductMovement on lastProductMovement.stockAccountMovementId = p.stockAccountMovementId
	  and lastProductMovement.code = p.code
where
  (
    :dateTo is null
    OR sam.date <= :dateTo
  )
and sam.type = 'receive'
group by FORMAT(sam.createdAt, 'MMMM', 'es-es'), FORMAT(sam.createdAt, 'MMyyyy')
order by FORMAT(sam.createdAt, 'MMyyyy')
