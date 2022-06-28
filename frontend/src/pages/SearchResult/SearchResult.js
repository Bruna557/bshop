import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCopy } from '../../store/localizationSlice'
import { setSearchAndFetchProductsThunk } from '../../store/productThunks'
import Grid from '../../components/Grid/Grid'

import './SearchResult.css'

const SearchResult = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const copy = useSelector(getCopy)
    const [q, setQ] = useState('')

    useEffect(() => {
        let _q = location.search.slice(3)  // ignore ?q=
        setQ(_q)
        dispatch(setSearchAndFetchProductsThunk(_q))  // Set search text and fetch first page
    }, [location, dispatch])  // 'dispatch' was only included here to avoid a lint warning

    return (
        <>
            {q && <p className='title'>{`${copy.you_searched}: ${q}`}</p>}
            <Grid />
        </>
    )
}

export default SearchResult
