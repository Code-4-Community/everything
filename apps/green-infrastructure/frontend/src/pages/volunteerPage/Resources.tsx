import { Box, Grid, ThemeProvider } from '@mui/material';
import { VolunteerResource, VOLUNTEER_RESOURCES } from './volunteerResources';
import CircleIcon from '@mui/icons-material/Circle';

export default function Resources() {
  const title = {
    color: 'var(--Text-Primary, #091F2F)',
    fontFamily: 'Helvetica',
    fontSize: '27px',
    fontStyle: 'bold',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textDecorationLine: 'underline',
    margin: '0',
  };

  const headings = {
    color: 'var(--Text-Second, #288BE4)',
    fontFamily: 'Lora',
    fontSize: '25px',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 'normal',
    margin: '0',
  };

  const content = {
    color: 'var(--text-primary-2, #58585B)',
    fontFamily: 'Lora',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '34px 45px 49px 45px',
        flexDirection: 'column',
        gap: '15px',
        flexShrink: '0',
        background: 'white',
        margin: '0',
      }}
    >
      <p style={title}>
        <u>FEATURED RESOURCES &rarr;</u>
      </p>
      <Grid container rowSpacing={8} sx={{
        padding: '18px',
      }}>
      {VOLUNTEER_RESOURCES.map((resource: VolunteerResource) => {
        return (<Grid xs={4} item sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <BoxPanel textContent={resource.resourceName}/>
          </Grid>)
      })}
      </Grid>
    </div>
  );
}

interface PanelProps {
  textContent: string;
}
function BoxPanel(props: PanelProps) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#F2F2F2',
            dark: '#B1F1F1',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '380px',
          height: '303px',
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircleIcon
          sx={{
            width: '100px',
            height: '100px',
            marginTop: '48px',
            marginBottom: '24px',
            color: '#FFFDFD',
          }}
        />
        <span
          style={{
            color: '#288BE4',
            fontSize: '20px',
            fontStyle: 'italic',
            lineHeight: '25.6px',
          }
        }>{props.textContent}</span>
      </Box>
    </ThemeProvider>
  );
}
