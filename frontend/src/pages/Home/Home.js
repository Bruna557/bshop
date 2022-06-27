import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCopy } from '../../store/localizationSlice'
import { setSearchAndFetchProductsThunk } from '../../store/productThunks'
import Grid from '../../components/Grid/Grid'

const Home = () => {
    const dispatch = useDispatch()
    const copy = useSelector(getCopy)

    useEffect(() => {
        dispatch(setSearchAndFetchProductsThunk(''))  // Clear search text and fetch first page
    }, [dispatch])  // 'dispatch' was only included here to avoid a lint warning

    return (
        <>
            <h1>{copy.catalog}</h1>
            <Grid />
        </>
    )
}

export default Home
