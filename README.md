# Solar-System-Simulation
Preview: [https://planets.sudip-neupane.com.np/](https://planets.sudip-neupane.com.np/)

A 2D canvas element in HTML & JS is used to draw the elements. 

The days of the revolution of a planet and the eccentricity of the planet's orbit are taken as it is in their natural form.

The size of the planet and orbital axis is taken such that they seem realistic for viewing.

The shape of orbit of the planet is in eclipse shape. The relation between the minor and major axes:

$$ b = a * \sqrt{1-e^2} $$

we get,

$$ minor_{axis} = major_{axis} * \sqrt{1-planet.eccentricity^2} $$
