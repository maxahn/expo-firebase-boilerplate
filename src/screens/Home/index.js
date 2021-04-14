import React from 'react';
import { Text, Divider, Layout } from '@ui-kitten/components';
import { HOME } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const Home = () => (
  <>
    <Header isMenuVisible title={capitalize(HOME)} />
    <Divider />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Home Stuff</Text>
    </Layout>
  </>
);

export default Home;
