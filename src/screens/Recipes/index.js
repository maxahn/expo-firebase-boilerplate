import React from 'react';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { RECIPES } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const Recipes = () => (
  <>
    <Header isBackVisible isMenuVisible title={capitalize(RECIPES)} />
    <Divider />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Recipes</Text>
    </Layout>
  </>
);

export default Recipes;
