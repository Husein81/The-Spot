/* eslint-disable react/prop-types */
import { Container } from '@mui/material';
import ProductCard from './ProductCard'

const ProductListingCards = ({products}) => {
  return (
    <Container sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      p: 4,
      maxWidth: '1200px', // Limit maximum width for larger screens
      margin: 'auto', // Center the content on medium-sized screens
    }}>
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </Container>
  )
}

export default ProductListingCards;