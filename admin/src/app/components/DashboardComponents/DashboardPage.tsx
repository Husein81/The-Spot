/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import TopBar from "../TopBar.tsx";
import DashboardCard from "./DashboardCard.tsx";
import LineChart from "./Charts/LineChart.tsx";
import { token } from "../../../Theme.ts";
import TransactionList from "./TransactionList.tsx";
import { AddShoppingCart, CurrencyExchange, People, ShoppingCart } from "@mui/icons-material";
import { useGetProductsQuery } from "../../redux/slices/productApi.ts";
import { useGetUsersQuery } from "../../redux/slices/userApi.ts";

interface Progress {
  label: string;
  value: number;
}

interface Item {
  title: string;
  subTitle: string;
  progress: Progress[];
  icon?:any; // Optional icon component with props
}

const DashboardPage = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const { data } = useGetProductsQuery({ isAdmin: true });
  const { data: users } = useGetUsersQuery(1);

  const products = (data?.products.length || 0) * 10;
  const B = 100 - products;

  const user = (users?.users.length || 0)*10;

  const userData: Progress[] = [
    { label: "A", value: user },
    { label: "B", value: 100 - user},
  ];
  const progressData: Progress[] = [
    { label: "A", value: products },
    { label: "B", value: B },
  ];
  const productData: Progress[] = [
    { label: "A", value: products },
    { label: "B", value: B },
  ];

  const dataItems: Item[] = [
    {

      title: "3200$",
      subTitle: "Total Sale ",
      icon: CurrencyExchange,
      progress: progressData,
    },
    {
      title: products.toString(),
      subTitle: "Products",
      icon: AddShoppingCart,
      progress: productData,
    },
    {
      title: users?.users.length.toString() || "0",
      subTitle: "Sellers",
      icon: People,
      progress: userData,
    },
    {
      title: "12",
      subTitle: "Orders",
      icon: ShoppingCart,
      progress: progressData,
    },
  ];

  return (
    <Container>
      <TopBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography pt={2} variant="h3" textTransform={"uppercase"}>
            Dashboard
          </Typography>
          <Typography variant="h6" fontWeight={600} sx={{ color: colors.greenAccent[600] }}>
            Welcome to your dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {dataItems.map((item, index:number) => (
              <Box key={index} bgcolor={colors.primary[400]} borderRadius={1} width="250px">
                <DashboardCard
                  title={item.title}
                  progress={item.progress}
                  subTitle={item.subTitle}
                  icon={item.icon ?<item.icon/> : null}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <LineChart />
            <TransactionList />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
