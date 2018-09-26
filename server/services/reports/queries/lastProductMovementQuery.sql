select * from products p
inner join (
	select p2.stockAccountMovementId, stockAccountMovements.type from products p
	cross apply (select top 1 * from products p2 where p.code = p2.code order by createdAt desc) p2
	join stockAccountMovements on stockAccountMovements.id = p2.stockAccountMovementId
	group by p2.stockAccountMovementId, stockAccountMovements.type
	having stockAccountMovements.type = 'receive'
) lastProductMovement on lastProductMovement.stockAccountMovementId = p.stockAccountMovementId
inner join productTypes on productTypes.id = p.typeId