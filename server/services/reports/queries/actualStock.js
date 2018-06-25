module.exports = `
    select p.code as IMEI, pt.ean as EAN, pt.description as Descripción
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    left join (select code
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    where sam.type = 'issue') ip on p.code = ip.code
    where sam.type = 'receive'
    and (:dateTo is null OR sam.date <= :dateTo)
    and ip.code is null
    order by pt.ean
`
