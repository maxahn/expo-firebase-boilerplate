import React from 'react';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { STUDY } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const Study = () => (
  <>
    <Header isMenuVisible isBackVisible title={capitalize(STUDY)} />
    <Divider />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Study</Text>
    </Layout>
  </>
);

export default Study;
