# Solar-System-Simulation
http://sudip-neupane.com.np/solar-system-simulation/

A 2D canvas element in HTML & JS is used to draw the elements. 

The days of the revolution of a planet and the eccentricity of the planet's orbit are taken as it is in natural form.

The size of the planet and orbital axis is taken such that they seem realistic for viewing.

The shape of orbit of the planet is in eclipse shape. So as form the relation between minor and major axis:

$$ b = a * \sqrt{1-e^2} $$

we get,

$$ minor_{axis} = major_{axis} * \sqrt{1-planet.eccentricity^2} $$
