import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCopy } from '../../store/localizationSlice'
import { setSearchAndFetchProductsThunk } from '../../store/productThunks'
import Grid from '../../components/Grid/Grid'

const SearchResult = () => {
    const dispatch = useDispatch()
    const copy = useSelector(getCopy)
    const [q, setQ] = useState('')

    useEffect(() => {
        let _q = (new URLSearchParams(window.location.search)).get('q')
        setQ(_q)
        dispatch(setSearchAndFetchProductsThunk(_q))  // Set search text and fetch first page
    }, [])


    return (
        <>
            {q && <h1>{`${copy.search_result}: ${q}`}</h1>}
            <Grid />
        </>
    )
}

export default SearchResult
