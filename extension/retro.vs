uniform float time;

uniform mat4 u_projectionMatrix;
attribute vec4 a_position;

void main() {
  // copy a_position to position - attributes are read only!
  vec4 position = a_position;

  // use our time uniform from the CSS declaration
  position.x += time;

  gl_Position = u_projectionMatrix * position;
}