import React from 'react'
import styled from 'styled-components'

export const Spinner = props => {
  
    const colorCode = props.dark ? '229,43,43' : '255,255,255';

    const Sdiv = styled.div`
        position: relative;
        overflow: hidden;

        .loader,
        .loader:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
        }
        .loader {
          margin: 0 auto;
          font-size: ${props.size ? props.size : 2}px;
          position: relative;
          text-indent: -9999em;
          border-top: 1.1em solid rgba(${colorCode}, 0.2);
          border-right: 1.1em solid rgba(${colorCode}, 0.2);
          border-bottom: 1.1em solid rgba(${colorCode}, 0.2);
          border-left: 1.1em solid ${props.dark ? '#e52b2b' : '#fff'};
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 .5s infinite linear;
          animation: load8 .5s infinite linear;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
    `
    return (
        <Sdiv>
            <div className="loader">Loading...</div>
        </Sdiv>
    )
}

export const LoadingOverlay = props => {

    if ( !props.show ) return null;

    const StyledDiv = styled.div`
        background: rgba(255,255,255,0.85);
    `

    return (
        <StyledDiv className={`absolute pin flex flex-col items-center justify-center z-50`}>
            <Spinner size={4} dark {...props} />
            <div className="pt-2 font-bold">{ props.children }</div>
        </StyledDiv>
    )

}