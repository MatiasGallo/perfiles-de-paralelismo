import {Button, Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 700,
        },
        margin: {
            height: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(2),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        card: {
            minWidth: 275,
            maxWidth: 500
        },
        title: {
            fontSize: 14,
        },
    }),
);

const chartOptions =  {
    plotOptions: {
        bar: {
            columnWidth: '100%',
        }
    },
    chart: {
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
        offsetY: -20,
            style: {
            fontSize: '12px',
                colors: ["#304758"]
        }
    },
    xaxis: {
        categories: [],
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                    gradient: {
                    colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
                offsetY: 20,
            formatter: (value: number) => {return "Tiempo " + value},
        },
    },
    fill: {
        gradient: {
            shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
        },
    },
    yaxis: {
        seriesName: "Cantidad de tareas",
        tickAmount: 1,
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
    },
};

export const Perfiles = () => {
    const classes = useStyles();
    const [lastNumber, setLastNumber] = useState(0);
    const [tasks, setTasks] = useState<number[]>([]);
    const [numberOfProcessors, setNumberOfProcessors] = useState(0);
    const [hardwareProfile, setHardwareProfile] = useState<number[]>([]);
    const theme = useTheme();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    function handleChangeTaskTextField(tasks: number) {
        setLastNumber(tasks);
    }

    const chartTitleSoftware = {
        title: {
            text: "Perfil de software",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize:  '16px',
                color:  theme.palette.text.primary
            },
        }
    };

    const chartTitleHardware = {
        title: {
            text: "Perfil de hardware",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize:  '16px',
                color:  theme.palette.text.primary
            },
        }
    };

    function handleNextTime() {
        if (lastNumber >= 0)
            setTasks([...tasks, lastNumber]);
    }
    
    function handleLastTime() {
        tasks.pop();
        setTasks([...tasks])
    }

    function handleReset() {
        setTasks([]);
        setHardwareProfile([]);
    }

    function handleChangeProcessors(processors: number) {
        setNumberOfProcessors(processors);
    }

    function handleGraphic() {
        let result: number[] = [];
        tasks.forEach((task) => {
            let value = task;
            while (value > numberOfProcessors) {
                result.push(numberOfProcessors);
                value -= numberOfProcessors
            }
            result.push(value)
        });
        setHardwareProfile(result);
    }

    return (
        <Grid
            spacing={2}
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
        >
            <Grid container direction={"column"}>
                <Typography variant={"h4"} align={"left"}>Calcular perfil de hardware</Typography>
                <Typography variant={"body1"} align={"left"}>A continuación podrás ingresar los valores del perfil de software para calcular el perfil de hardware correspondiente. Es necesario que ingreses la cantidad de tareas por unidad de tiempo y la cantidad de procesadores.</Typography>
            </Grid>
            <Grid container spacing={2} alignItems={"center"} direction={"column"}>
                <Grid item><Button className={classes.button} variant={"contained"} color={"primary"} onClick={handleLastTime}>Anterior t</Button></Grid>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Cantidad de tareas"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange={(event => handleChangeTaskTextField(parseInt(event.currentTarget.value)))}
                    />
                </Grid>
                <Grid item><Button className={classes.button} variant={"contained"} color={"primary"} onClick={handleNextTime}>Próximo t</Button></Grid>
            </Grid>
            <Grid container spacing={2} direction={"column"} alignContent={"center"}>
                <Grid item>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Tareas parciales
                            </Typography>
                            {tasks.map((value, index) => (
                                <Typography key={index}>Tiempo {index+1}, cantidad de tareas: {value}</Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item><Button className={classes.button} variant={"contained"} color={"secondary"} onClick={handleReset}>Reiniciar</Button></Grid>
            </Grid>
            <Grid item>
                {tasks.length > 0 ? (
                    <Chart
                        options={{...chartOptions, ...chartTitleSoftware, tooltip: { theme: prefersDarkMode ? 'dark' : 'light'}, grid: { borderColor: theme.palette.text.primary}, theme: { mode: prefersDarkMode ? 'dark' : 'light' }, chart: { background: theme.palette.background.paper }}}
                        series={[{name: "Cantidad de tareas", data: tasks}]}
                        type="bar"
                    />
                ):null}
            </Grid>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <TextField
                        id="outlined-number"
                        label="Cantidad de procesadores"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange={(event => handleChangeProcessors(parseInt(event.currentTarget.value)))}
                    />
                </Grid>
                <Grid item><Button className={classes.button} variant={"contained"} color={"primary"} onClick={handleGraphic} disabled={numberOfProcessors === 0}>Graficar</Button></Grid>
            </Grid>
            <Grid item>
                {numberOfProcessors > 0 && tasks.length > 0 ? (
                    <Chart
                        options={{...chartOptions, ...chartTitleHardware, tooltip: { theme: prefersDarkMode ? 'dark' : 'light'}, theme: { mode: prefersDarkMode ? 'dark' : 'light' }}}
                        series={[{name: "Cantidad de tareas", data: hardwareProfile}]}
                        type="bar"
                    />
                ):null}
            </Grid>
        </Grid>
    );
};
