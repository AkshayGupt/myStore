import React from 'react';

const Base = ({
    title="My Title",
    description="My Description",
    className ="bg-dark text-white p-4",
    children
})=>(
        <div>
            <div className="container-fluid">
                <div className="jumbotron text-center text-white bg-dark">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>    
                </div> 
                <div className={className}>{children}</div>
                <footer className="footer bg-dark mt-auto py-3">
                    <div className="container-fluid bg-success text-white text-center py-3">
                        <h4>If you got any questions,feel free to reach out!</h4>
                        <button className="btn btn-lg btn-warning">Contact us</button>
                    </div>
                    <div className="container-fluid">
                        <p className="text-muted">One stop for Online Shopping</p>
                    </div>
                </footer>  
            </div>

        </div>
)

export default Base;