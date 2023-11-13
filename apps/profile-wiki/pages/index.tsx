import React, { FC } from 'react';
import ResponsiveAppBar from '../components/Header';
import Footer from '../components/Footer';
import CharacterInfoCard from '../components/CharacterInfoCard.jsx';
import { Container, Grid, Typography } from '@mui/material';
import { gql } from '@apollo/client';
import {client} from '../utils/apollo-client';
import Link from 'next/link';

interface character {
  results: {
    id: number;
    name: string;
    count: number;
    image: string;
  }[];
}

type CharacterType = {
  characters: character;
};

const Home: FC<CharacterType> = ({ characters }) => {
  return (
    <div>
      <ResponsiveAppBar />

      <Container
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <Typography variant="h3" style={{ textAlign: 'center' }}>
          All Characters
        </Typography>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
          {characters?.results?.map((char) => {
            return (
              <>
                <Grid key={char.id} item xs={2} sm={4} md={4}>
                  <Link href={`/character/${char.id}`}>
                    <CharacterInfoCard chars={char} />
                  </Link>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetCharacters {
        characters {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  console.log(data);
  return {
    props: {
      characters: data.characters,
    },
  };
}
