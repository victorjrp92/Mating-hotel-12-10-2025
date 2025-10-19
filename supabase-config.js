// ============================================
// SUPABASE CONFIGURATION
// ============================================

// IMPORTANTE: Reemplazar estos valores con los de tu proyecto Supabase
const SUPABASE_URL = 'https://your-project.supabase.co'; // Cambiar por tu URL
const SUPABASE_ANON_KEY = 'your-anon-key-here'; // Cambiar por tu anon key

// Flag para habilitar/deshabilitar autenticación
const ENABLE_SUPABASE = false; // Cambiar a true cuando tengas las credenciales

// Initialize Supabase client
let supabase = null;

// Function to initialize Supabase (called when script loads)
function initSupabase() {
    if (!ENABLE_SUPABASE) {
        console.log('Supabase authentication is disabled. Enable it in supabase-config.js');
        return null;
    }
    
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase SDK not loaded. Please include the Supabase script in your HTML.');
        return null;
    }
    
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            flowType: 'pkce'
        }
    });
    
    // Make it globally available
    window.supabaseClient = supabase;
    
    return supabase;
}

// Database helper functions
const maritingDB = {
    // Check if user exists and has remaining AI analyses
    async checkUserAnalysisCredits(email) {
        if (!supabase) return { error: 'Supabase not initialized', credits: 1 };
        
        try {
            const { data, error } = await supabase
                .from('users')
                .select('ai_analysis_remaining, email_verified')
                .eq('email', email)
                .single();
            
            if (error && error.code === 'PGRST116') {
                // User doesn't exist
                return { exists: false, credits: 0 };
            }
            
            if (error) throw error;
            
            return { 
                exists: true, 
                credits: data.ai_analysis_remaining,
                verified: data.email_verified
            };
        } catch (error) {
            console.error('Error checking user credits:', error);
            return { error: error.message, credits: 0 };
        }
    },
    
    // Create new user in database
    async createUser(userData) {
        if (!supabase) return { error: 'Supabase not initialized' };
        
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([{
                    email: userData.email,
                    full_name: userData.fullName,
                    company_name: userData.companyName,
                    employee_count: userData.employeeCount,
                    ab_test_variant: userData.variant,
                    email_verified: false,
                    ai_analysis_remaining: 1
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, user: data };
        } catch (error) {
            console.error('Error creating user:', error);
            return { error: error.message };
        }
    },
    
    // Update user email verification status
    async verifyUserEmail(email) {
        if (!supabase) return { error: 'Supabase not initialized' };
        
        try {
            const { error } = await supabase
                .from('users')
                .update({ email_verified: true })
                .eq('email', email);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error verifying email:', error);
            return { error: error.message };
        }
    },
    
    // Log AI analysis usage
    async logAIAnalysisUsage(email, hotelName, platform) {
        if (!supabase) return { error: 'Supabase not initialized' };
        
        try {
            // Get user ID
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .single();
            
            if (userError) throw userError;
            
            // Log analysis
            const { error: logError } = await supabase
                .from('ai_analysis_logs')
                .insert([{
                    user_id: userData.id,
                    hotel_name: hotelName,
                    platform: platform,
                    success: true
                }]);
            
            if (logError) throw logError;
            
            // Decrement remaining analyses
            const { error: updateError } = await supabase
                .from('users')
                .update({ ai_analysis_remaining: 0 })
                .eq('email', email);
            
            if (updateError) throw updateError;
            
            return { success: true };
        } catch (error) {
            console.error('Error logging AI analysis:', error);
            return { error: error.message };
        }
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.maritingDB = maritingDB;
}
