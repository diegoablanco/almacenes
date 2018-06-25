module.exports = `
    select count(pt.description) as Cantidad, pt.description as Descripción, pt.ean as EAN
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    join [dbo].[productTypes] pt on p.typeId = pt.id
    left join (select code
    from products p
    join [dbo].[stockAccountMovements] sam on p.stockAccountMovementId = sam.id
    where sam.type = 'issue') ip on p.code = ip.code
    where sam.type = 'receive'
    and ip.code is null
    group by pt.description, pt.ean
    order by Cantidad desc
`
