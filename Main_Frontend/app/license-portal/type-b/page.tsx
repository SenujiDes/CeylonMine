'use client'
import React, { useState } from 'react'
import Navbar from '../../navbar/page'

interface FormData {
  explorationLicenseNo: string;
  individualDetails: {
    applicantName: string;
    nationalIdNo: string;
    address: string;
    nationality: string;
    employment: string;
    sriLankaDetails: {
      placeBusiness: string;
      residence: string;
    }
  };
  corporationDetails: {
    companyName: string;
    countryIncorporation: string;
    headOffice: string;
    sriLankaAddress: string;
    legalFinancialData: {
      capitalization: string;
      articlesOfAssociation: File | null;
      annualReports: File | null;
    }
  };
  technicalData: {
    licensedBoundarySurvey: File | null;
    projectTeamCredentials: File | null;
    economicViabilityReport: File | null;
  };
  industrialMiningOperation: {
    blastingMethod: string;
    boreHoleDepth: string;
    productionVolume: string;
    machineryUsed: string;
    shaftDepth: string;
    explosivesType: string;
  };
  licenseAreaDetails: {
    landName: string;
    landOwner: string;
    villageName: string;
    gramaNiladhariDivision: string;
    divisionalSecretary: string;
    administrativeDistrict: string;
    deedCopy: File | null;
    surveyPlan: File | null;
    leaseAgreement: File | null;
  };
  mineRestorationPlan: File | null;
  bondDetails: string;
  mineralsToMine: string;
  licenseFeeReceipt: File | null;
  declaration: {
    date: string;
    signature: string;
    mineManager: string;
  }
}

export default function TypeALicense() {
  const [formData, setFormData] = useState<FormData>({
    explorationLicenseNo: '',
    individualDetails: {
      applicantName: '',
      nationalIdNo: '',
      address: '',
      nationality: '',
      employment: '',
      sriLankaDetails: {
        placeBusiness: '',
        residence: ''
      }
    },
    corporationDetails: {
      companyName: '',
      countryIncorporation: '',
      headOffice: '',
      sriLankaAddress: '',
      legalFinancialData: {
        capitalization: '',
        articlesOfAssociation: null,
        annualReports: null
      }
    },
    technicalData: {
      licensedBoundarySurvey: null,
      projectTeamCredentials: null,
      economicViabilityReport: null
    },
    industrialMiningOperation: {
      blastingMethod: '',
      boreHoleDepth: '',
      productionVolume: '',
      machineryUsed: '',
      shaftDepth: '',
      explosivesType: ''
    },
    licenseAreaDetails: {
      landName: '',
      landOwner: '',
      villageName: '',
      gramaNiladhariDivision: '',
      divisionalSecretary: '',
      administrativeDistrict: '',
      deedCopy: null,
      surveyPlan: null,
      leaseAgreement: null
    },
    mineRestorationPlan: null,
    bondDetails: '',
    mineralsToMine: '',
    licenseFeeReceipt: null,
    declaration: {
      date: '',
      signature: '',
      mineManager: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        data.append(key, value);
      } else if (typeof value === 'object') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value.toString());
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/licenses/type-a', {
        method: 'POST',
        body: data,
      });
      
      if (response.ok) {
        alert('License application submitted successfully!');
      } else {
        alert('Failed to submit license application');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting license application');
    }
  };

  const handleFileChange = (section: string, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.files![0]
        }
      }));
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">IML Type B License Application</h1>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Exploration License */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Exploration License No</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Exploration License No (where applicable)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.explorationLicenseNo}
                    onChange={(e) => setFormData({...formData, explorationLicenseNo: e.target.value})}
                  />
                </div>
              </div>

              {/* 2. Individual Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">2. Individual Details</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Applicant / Authorized Agent</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.individualDetails.applicantName}
                      onChange={(e) => setFormData({
                        ...formData,
                        individualDetails: { ...formData.individualDetails, applicantName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">National Identity Card No</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.individualDetails.nationalIdNo}
                      onChange={(e) => setFormData({
                        ...formData,
                        individualDetails: { ...formData.individualDetails, nationalIdNo: e.target.value }
                      })}
                    />
                  </div>
                  {/* Add other individual fields similarly */}
                </div>
              </div>

              {/* 3. Corporation Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">3. Corporation Details</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Company/Partnership</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.corporationDetails.companyName}
                      onChange={(e) => setFormData({
                        ...formData,
                        corporationDetails: { ...formData.corporationDetails, companyName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Articles of Association</label>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleFileChange('corporationDetails', 'articlesOfAssociation')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last three years Annual Reports</label>
                    <input
                      type="file"
                      multiple
                      className="mt-1 block w-full"
                      onChange={handleFileChange('corporationDetails', 'annualReports')}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Technical/Professional Data */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">4. Technical/Professional Data</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Licensed Boundary Survey</label>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleFileChange('technicalData', 'licensedBoundarySurvey')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Professional/Technical Credentials</label>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleFileChange('technicalData', 'projectTeamCredentials')}
                    />
                  </div>
                </div>
              </div>

              {/* 5. Industrial Mining Operation */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">5. Type of Industrial Mining Operation</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blasting Method</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.industrialMiningOperation.blastingMethod}
                      onChange={(e) => setFormData({
                        ...formData,
                        industrialMiningOperation: { ...formData.industrialMiningOperation, blastingMethod: e.target.value }
                      })}
                    />
                  </div>
                  {/* Add other mining operation fields */}
                </div>
              </div>

              {/* 6. License Area Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">6. Details of License Area</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name of Land</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.licenseAreaDetails.landName}
                      onChange={(e) => setFormData({
                        ...formData,
                        licenseAreaDetails: { ...formData.licenseAreaDetails, landName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deed and Survey Plan</label>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleFileChange('licenseAreaDetails', 'deedCopy')}
                    />
                  </div>
                </div>
              </div>

              {/* 7. Mine Restoration Plan */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">7. Detailed Mine Restoration Plan</h2>
                <div>
                  <input
                    type="file"
                    className="mt-1 block w-full"
                    onChange={handleFileChange('', 'mineRestorationPlan')}
                  />
                </div>
              </div>

              {/* 8. Bond Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">8. Nature of Amount of Bond</h2>
                <div>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.bondDetails}
                    onChange={(e) => setFormData({...formData, bondDetails: e.target.value})}
                  />
                </div>
              </div>

              {/* 9. Minerals */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">9. Names of Mineral/Minerals to be Mined</h2>
                <div>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.mineralsToMine}
                    onChange={(e) => setFormData({...formData, mineralsToMine: e.target.value})}
                  />
                </div>
              </div>

              {/* 10. License Fee */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">10. License Fee Receipt</h2>
                <div>
                  <input
                    type="file"
                    className="mt-1 block w-full"
                    onChange={handleFileChange('', 'licenseFeeReceipt')}
                  />
                </div>
              </div>

              {/* Declaration */}
              <div className="space-y-4 border-t pt-6">
                <h2 className="text-xl font-semibold">Declaration</h2>
                <p className="text-sm text-gray-600">
                  I, the undersigned, do hereby certify that the statements contained in this application are true and
                  correct to the best of my knowledge and undertake to comply with the provisions the Mines & Minerals Act No.33 of 1992,
                  and the Regulation made thereunder.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.declaration.date}
                      onChange={(e) => setFormData({
                        ...formData,
                        declaration: { ...formData.declaration, date: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mine Manager</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formData.declaration.mineManager}
                      onChange={(e) => setFormData({
                        ...formData,
                        declaration: { ...formData.declaration, mineManager: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 