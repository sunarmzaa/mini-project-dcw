import React, { Component } from 'react';

class Contact extends Component {
    state = {}
    render() {
        return (<div>Contact Page</div>);
    }
}

export default Contact;


// import React, { Component } from 'react';
// import { useSpring, animated } from 'react-spring'

// const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

// class Contact extends Component {
//     state = {}
//     render() {
//         return (<div>Contact Page</div>);
//     }
// }
// function Text() {
//     const [flip, set] = useState(false)
//     const props = useSpring({
//       to: { opacity: 1 },
//       from: { opacity: 0 },
//       reset: true,
//       reverse: flip,
//       delay: 200,
//       config: config.molasses,
//       onRest: () => set(!flip),
//     })
  
//     return <animated.h1 style={props}>hello</animated.h1>
//   }

// export default Contact;
