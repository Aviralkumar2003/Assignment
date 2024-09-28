import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../store/actions/productActions';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { categories, products, loading } = useSelector((state) => state.products);
  const { category } = router.query;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(category, skip, 10, search));
  }, [dispatch, category, skip, search]);

  const handleCategoryChange = (newCategory) => {
    router.push(`/?category=${newCategory}`);
    setSkip(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSkip(0);
  };

  const loadMoreProducts = () => {
    setSkip((prevSkip) => prevSkip + 10);
  };

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Categories
          </Typography>
          <Select
            value={category || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            displayEmpty
            sx={{ marginRight: 2, bgcolor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            sx={{ marginRight: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <Button variant="contained" color="secondary" onClick={() => { setSearch(''); setSkip(0); }}>
            Clear Search
          </Button>
        </Toolbar>
      </AppBar>

      {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 2 }} />}

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          !loading && (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No products found
              </Typography>
            </Grid>
          )
        )}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" onClick={loadMoreProducts} disabled={loading}>
          Load more
        </Button>
      </Box>
    </Container>
  );
}
