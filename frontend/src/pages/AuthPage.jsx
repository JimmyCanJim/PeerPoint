import React, {useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import {useNavigate} from "react-router";
import {motion, AnimatePresence} from "framer-motion";
import Background from "../components/Background";
import { Glasses, Mail, Lock, User, ArrowRight, ShieldCheck, Cpu} from 'lucide-react'; 
import WTCIcon from "../assets/wethinkcode.png";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user_name");
        if (loggedInUser) {
            navigate("/dashboard/peer_tutor");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const {data} = await axios.post(`http://localhost:5001${endpoint}`, formData, {
                withCredentials: true
            });
            
            localStorage.setItem("user_name", data.name);
            toast.success(isLogin ? `Welcome back, ${data.name}!` : "Account created.");
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6">
            <motion.div 
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 2, ease: "easeInOut"}}
                className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2 rounded-lg border" 
                        style={{backgroundColor: "var(--color-paper)", 
                        border: 'none',
                        boxShadow: "0 0 15px var(--color-shadow)",
                        marginRight: "1rem"}}>
                        <img 
                          src={WTCIcon} 
                          alt="PeerPoint Logo" 
                          className="w-12 h-12" 
                          style={{ width: '50px', height: '50px' }} 
                        />
                    </div>
                    <h1 style= {{
                        fontSize: "2.5rem",
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        fontWeight: '900',
                        color: 'var(--color-main)'
                    }}>
                        Peer<span style={{color: "var(--color-accent)"}}>Point</span>
                    </h1>
                </div>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-4"></div>
            </motion.div>            
                
            <motion.div
              initial= {{opacity: 0, scale: 0.80}}
              animate= {{opacity: 1, scale: 1}}
              className= "w-full max-w-[440px] backdrop-blur-2xl rounded-[2rem] relative overflow-hidden transition-all"
              style= {{
                  backgroundColor: "var(--color-card-bg)",
                  border: '1px solid var(--color-card-border)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0px 0px 20px var(--color-card-shadow)",
                borderColor: "var(--color-accent)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >

                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                    <ShieldCheck 
                        size={32} 
                        style={{color: 'var(--color-accent, #b45309)'}} 
                        transition={{
                        duration: 5,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.6, 1],
                        repeat: Infinity,
                        repeatType: "mirror"
                        }}
                    />
                </div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase"
                    style={{
                      color: 'var(--color-main)'
                    }}>
                    {isLogin ? 'Login' : 'Registration'}
                    <span style={{color: "var(--color-accent)"}}>.</span>
                  </h2>
                </div>

                <form 
                  onSubmit={handleSubmit} 
                  style={{
                    dsiplay: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    width: '100%'
                  }}
                >

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="form-control"
              >
                <label className="label font-bold text-[10px] uppercase tracking-widest" 
                  style={{color: "var(--color-ink-secondary)"}}
                >
                  Full Name & Surname
                </label>
                
                <div className="relative">
                    <input 
                      type="text" 
                      name="name" 
                      className="peer w-full rounded transition-all" 
                      placeholder="Assessor Name" 
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        paddingLeft: '3rem',  
                        paddingTop: '1rem',
                        paddingBottom: '1rem',  
                        backgroundColor: 'var(--color-input-bg)',
                        boxSizing: 'border-box',
                        border: '1px solid var(--color-inpu-border)',
                        borderRadius: '0.75rem',
                        marginBottom: '0.8rem'
                      }}
                    />
                    <User 
                      className="absolute transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" 
                      size={18} 
                      style={{
                        color: 'var(--color-secondary)',
                        position: 'absolute',
                        left: '1rem',
                        top : '40%',
                        transform: 'translateY(-50%)'}}
                      />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-control">
            <label 
              className="label font-bold text-[10px] uppercase tracking-widest" 
              style={{color: "var(--color-ink-secondary)"}}
            >
              User Email
            </label>

            <div className="relative" style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="email@agency.com" 
                  className="peer w-full rounded transition-all"
                  required 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',  
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    backgroundColor: 'var(--color-input-bg)',
                    boxSizing: 'border-box',
                    border: '1px solid var(--color-inpu-border)',
                    borderRadius: '0.75rem',
                    marginBottom: '0.8rem'
                  }}
                />
                <Mail 
                      className="absolute transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" 
                      size={18} 
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-secondary)',
                        pointerEvents: 'none',
                      }}
                />
            </div>
          </div>

          <div className="form-control">
            <label 
              className="label font-bold text-[10px] uppercase tracking-widest" 
              style={{color: "var(--color-ink-secondary)"}}
            >
              User Password
            </label>

            <div className="relative" style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="••••••••" 
                  className="peer w-full rounded transition-all"
                  required onChange={handleChange}
                  style= {{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',  
                    backgroundColor: 'var(--color-input-bg)',
                    boxSizing: 'border-box',
                    border: '1px solid var(--color-input-border)',
                    borderRadius: '0.75rem',
                    marginBottom: '0.8rem'         
                  }}
                />
                <Lock 
                  className="absolute transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" 
                  size={18} 
                  style={{
                    color: 'var(--color-secondary)',
                    position: 'absolute',
                    left: '1rem',
                    top : '40%',
                    transform: 'translateY(-50%)'}}
                />
            </div>
            {isLogin && (
              <label className="label justify-end">
                <a href="#" className="label font-bold text-[10px] uppercase tracking-widest" style={{color: "var(--color-accent)"}}>Forgot Password?</a>
              </label>
            )}
          </div>

          <div className="form-control mt-8">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl border-none h-14 font-bold uppercase tracking-widest
                transition-all duration-300 ease-out
                hover:opacity-90 hover:shadow-xl
                active:scale-[0.98] active:translate-y-1 active:shadow-inner
                disabled:opacity-50 disabled:cursor-not-allowed`
              }
              style={{
                width : '90%',
                color: "var(--color-ink-secondary)",
                backgroundColor: 'var(--color-btn-bg)',
                boxSizing: 'border-box',
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                marginTop: '1rem', 
                display: 'flex',
                flexDirection: 'column',
                justifySelf: 'center',
              }}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                <div className="flex items-center justify-center gap-3 w-full h-full">
                  <span className="flex items-center justify-center gap-2">
                    {isLogin ? 'Login' : 'Create Account'}
                  </span>
                  <ArrowRight 
                    size={20} 
                    className="relative -top-[1px] transition-transform group-hover:translate-x-1"
                    />
                </div>

                </>
              )}
            </button>
          </div>
        </form>

      
        <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[12px] font-bold uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors duration-1000 border-none"
              style={{
                color: "var(--color-ink-secondary)",
                backgroundColor: 'var(--color-btn-bg)',
                marginTop: '1rem',
                borderRadius: '0.75rem',
                padding: '0.5rem 0.5rem 0.5rem 0.5rem'
              }}
            >
              {isLogin ? "Not signed-up? REGISTER" : "Already signed-up? LOGIN"}
            </button>
        </div>
            </motion.div>
        </div>
    );
}



export default AuthPage;