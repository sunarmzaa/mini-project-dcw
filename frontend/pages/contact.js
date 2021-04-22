import React, { Component } from 'react';
import styles from '../styles/contact.module.css'


class Contact extends Component {
    state = {}
    render() {
        return (<div>

            <div className={styles.profile}>
                <h3>ติดต่อ</h3>
                <p>นายพีรพล กุลเมือง</p>
                <p>รหัสนักศึกษา 6035512024 Section 01</p>
                <p>Email : sunarmzaa@gmail.com</p>
                <p>Tel : 0922293495</p>
                <img src="../image/arm.jpg" width="250px" height="250px" />
            </div>

        </div>);
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
