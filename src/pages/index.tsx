import { Inter } from 'next/font/google';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, setData, setStatus } from '@/redux/features/emailSlice';
import { emailSchema } from '@/lib/validation';
import { Formik } from 'formik';

import HeadSEO from '@/components/HeadSEO';
import ErrorMessage from '@/components/ErrorMessage';
import { BASE_URL, options } from '@/utils';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data } = useSelector((state: any) => state.email);
  const dispatch = useDispatch();
  const appTitle = 'Authetic Mail Solution';

  const validateEmail = async (email: string) => {
    dispatch(setStatus(STATUSES.LOADING));
    let url = BASE_URL + `/api/email/${email}`;
    let response = await fetch(url);
    let data = await response.json();
    dispatch(setData(data));
    dispatch(setStatus(STATUSES.IDLE));
  };

  return (
    <Fragment>
      <HeadSEO />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-11 ${inter.className}`}
      >
        <h1 className="text-3xl font-semibold flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {appTitle}
        </h1>

        {/* Form */}

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap gap-12 items-center">
            <div className=" md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-gray-900">
                {appTitle}
              </h1>
              <p className="leading-relaxed mt-4">
                Say goodbye to bounced emails and improve your email <br />
                deliverability today with our AuthenticMailSolution
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col w-96 mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Check Email For Free!
              </h2>

              <Formik
                initialValues={{ email: '' }}
                validationSchema={emailSchema}
                onSubmit={(values, { setSubmitting }) => {
                  validateEmail(values.email);
                  setTimeout(() => {
                    // console.log(values);
                    setSubmitting(false);
                  }, 300);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="w-full text-sm font-semibold bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>

                    {errors.email && touched.email && (
                      <ErrorMessage message={errors.email} />
                    )}

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="disabled:cursor-not-allowed text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                    >
                      Submit
                    </button>
                    <p className="font-medium text-gray-700 mt-3">
                      {data?.message}
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
