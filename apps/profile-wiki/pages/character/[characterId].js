import React from 'react';
import ResponsiveAppBar from '../../components/Header';
import Footer from '../../components/Footer';
import { Container, Typography } from '@mui/material';
import styles from '../index.module.css';
import {client} from '../../utils/apollo-client';
import { gql } from '@apollo/client';

function CharacterDetails({char}) {
  console.log(char);
  return (
    <>
      <ResponsiveAppBar />

      <Container className={styles.center}>
        <Typography variant="h4" padding={2} style={{ textAlign: 'center' }}>
          Character Info
        </Typography>

        <div className={styles.character_detail}>
          <div className={styles.left}>
            <img src={char.image} alt={char.name} />
          </div>

          <div className={styles.right}>
            <ul>
              <li>ID - {char.id}</li>
              <li>Name - {char.name}</li>
              <li>Gender - {char.gender} </li>
              <li>Species - {char.species} </li>
              <li>Type - {char.type} </li>
              <li>Status - {char.status} </li>
              <li>Origin - {char.origin.name} </li>
              <li>Location - {char.location.name} </li>
              <li>CreatedAt - {char.created} </li>
            </ul>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default CharacterDetails;

export async function getStaticPaths() {
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

  const paths = data.characters.results.map((ch) => {
    return {
      params: {
        characterId: `${ch.id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const { data } = await client.query({
    query: gql`
      query GetCharacterById {
        character (id : ${params.characterId}) {
          
          id
          name
          status
          species
          type
          gender
          created
          image
          origin {
            name
            
          }
          location {
            name
            
          }
        }
      }
    `,
  });


  console.log(data);
  return {
    props: {
      char: data.character,
    },
    // revalidate: 10, to stop stale the data on change
  };
}
