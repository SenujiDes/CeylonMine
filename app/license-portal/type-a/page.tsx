'use client'
import React, { useState } from 'react'
import Navbar from '../../navbar/page'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700"
        >
          <h2 className="text-3xl font-semibold text-gray-100 mb-6">Type A License</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* 1. Exploration License */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Exploration License No
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.explorationLicenseNo}
                  onChange={(e) => setFormData({...formData, explorationLicenseNo: e.target.value})}
                />
              </div>

              {/* 2. Individual Details */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name of Applicant / Authorized Agent
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.individualDetails.applicantName}
                  onChange={(e) => setFormData({
                    ...formData,
                    individualDetails: { ...formData.individualDetails, applicantName: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  National Identity Card No
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.individualDetails.nationalIdNo}
                  onChange={(e) => setFormData({
                    ...formData,
                    individualDetails: { ...formData.individualDetails, nationalIdNo: e.target.value }
                  })}
                />
              </div>

              {/* 3. Corporation Details */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name of Company/Partnership
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.corporationDetails.companyName}
                  onChange={(e) => setFormData({
                    ...formData,
                    corporationDetails: { ...formData.corporationDetails, companyName: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Articles of Association
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('corporationDetails', 'articlesOfAssociation')}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last three years Annual Reports
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('corporationDetails', 'annualReports')}
                />
              </div>

              {/* 4. Technical/Professional Data */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Licensed Boundary Survey
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('technicalData', 'licensedBoundarySurvey')}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Professional/Technical Credentials
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('technicalData', 'projectTeamCredentials')}
                />
              </div>

              {/* 5. Industrial Mining Operation */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Blasting Method
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.industrialMiningOperation.blastingMethod}
                  onChange={(e) => setFormData({
                    ...formData,
                    industrialMiningOperation: { ...formData.industrialMiningOperation, blastingMethod: e.target.value }
                  })}
                />
              </div>

              {/* 6. License Area Details */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Name of Land
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.licenseAreaDetails.landName}
                  onChange={(e) => setFormData({
                    ...formData,
                    licenseAreaDetails: { ...formData.licenseAreaDetails, landName: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Deed and Survey Plan
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('licenseAreaDetails', 'deedCopy')}
                />
              </div>

              {/* 7. Mine Restoration Plan */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Detailed Mine Restoration Plan
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('', 'mineRestorationPlan')}
                />
              </div>

              {/* 8. Bond Details */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nature of Amount of Bond
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.bondDetails}
                  onChange={(e) => setFormData({...formData, bondDetails: e.target.value})}
                />
              </div>

              {/* 9. Minerals */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Names of Mineral/Minerals to be Mined
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.mineralsToMine}
                  onChange={(e) => setFormData({...formData, mineralsToMine: e.target.value})}
                />
              </div>

              {/* 10. License Fee */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  License Fee Receipt
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  onChange={handleFileChange('', 'licenseFeeReceipt')}
                />
              </div>

              {/* Declaration */}
              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Declaration
                </label>
                <p className="text-sm text-gray-400">
                  I, the undersigned, do hereby certify that the statements contained in this application are true and
                  correct to the best of my knowledge and undertake to comply with the provisions the Mines & Minerals Act No.33 of 1992,
                  and the Regulation made thereunder.
                </p>
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.declaration.date}
                  onChange={(e) => setFormData({
                    ...formData,
                    declaration: { ...formData.declaration, date: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mine Manager
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           text-gray-100 placeholder-gray-400"
                  value={formData.declaration.mineManager}
                  onChange={(e) => setFormData({
                    ...formData,
                    declaration: { ...formData.declaration, mineManager: e.target.value }
                  })}
                />
              </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 text-gray-900 py-3 px-6 rounded-md 
                       hover:bg-blue-400 transition-colors font-medium"
              type="submit"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
} 