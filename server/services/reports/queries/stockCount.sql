select
  count(pt.description) as Cantidad,
  pt.ean as EAN,
  pt.description as Descripción,
  sum(p.price) as Precio
from
  products p
  join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
  join [dbo].[productTypes] pt on p.typeId = pt.id
  left join (
    select top 1
      code
    from
      products p
      join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    where
      sam.date <= :dateTo
	order by
	  sam.id desc
  ) ip on p.code = ip.code
where
  sam.type = 'receive'
  and (
    :dateTo is null
    OR sam.date <= :dateTo
  )
group by
  pt.description,
  pt.ean
order by
  Cantidad desc
