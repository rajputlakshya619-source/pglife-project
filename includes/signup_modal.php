<div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="signup-heading" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="signup-heading">Signup with PGLife</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span>&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <form id="signup-form" class="form" method="post" action="api/signup_submit.php">

                    <div class="form-group">
                        <input type="text" class="form-control" name="full_name" placeholder="Full Name" required>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" name="phone" placeholder="Phone Number" maxlength="10" required>
                    </div>

                    <div class="form-group">
                        <input type="email" class="form-control" name="email" placeholder="Email Address" required>
                    </div>

                    <div class="form-group">
                        <input type="password" class="form-control" name="password" placeholder="Password" minlength="6" required>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" name="college_name" placeholder="College Name" required>
                    </div>

                    <div class="form-group">
                        <label class="mr-3">
                            <input type="radio" name="gender" value="Male" required> Male
                        </label>

                        <label>
                            <input type="radio" name="gender" value="Female" required> Female
                        </label>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">
                            Create Account
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</div>